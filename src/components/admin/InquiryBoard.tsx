"use client";

import { useCallback, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import type { InquiryRecord } from "@/lib/inquiry";

type BoardRecord = InquiryRecord & { number: number };

type ListResponse = {
  ok: boolean;
  items: BoardRecord[];
  page: number;
  totalPages: number;
  total: number;
  message?: string;
};

type Stage = "closed" | "password" | "board";

function formatDate(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function InquiryBoard() {
  const [stage, setStage] = useState<Stage>("closed");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<ListResponse | null>(null);
  const [selected, setSelected] = useState<BoardRecord | null>(null);

  /**
   * 비밀번호는 서버에서만 검증합니다. 페이지를 넘길 때도 같은 비밀번호를
   * 다시 보내며, 브라우저 저장소에는 남기지 않습니다(메모리 상태만 사용).
   */
  const fetchPage = useCallback(
    async (page: number, pw: string): Promise<ListResponse | null> => {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, page }),
      });
      const json: ListResponse = await res.json();
      if (!res.ok) {
        setAuthError(json.message ?? "목록을 불러오지 못했습니다.");
        return null;
      }
      return json;
    },
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password) {
      setAuthError("비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    setAuthError("");
    try {
      const json = await fetchPage(1, password);
      if (json) {
        setData(json);
        setSelected(null);
        setStage("board");
      }
    } catch {
      setAuthError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function goPage(page: number) {
    setLoading(true);
    try {
      const json = await fetchPage(page, password);
      if (json) {
        setData(json);
        setSelected(null);
      }
    } catch {
      setAuthError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function closeAll() {
    setStage("closed");
    setPassword("");
    setAuthError("");
    setData(null);
    setSelected(null);
  }

  return (
    <>
      {/* 푸터 상태 라인 — AUTRIN 클릭이 진입점입니다. */}
      <div className="flex items-center gap-gutter-xs font-mono text-label-code text-tertiary">
        <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
        <span>
          <button
            type="button"
            onClick={() => setStage("password")}
            aria-haspopup="dialog"
            title="문의 내역 조회"
            className="rounded underline-offset-2 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/50"
          >
            AUTRIN
          </button>{" "}
          ENTERPRISE CLOUD NETWORK ONLINE
        </span>
      </div>

      {/* 1) 비밀번호 입력 */}
      <Modal
        open={stage === "password"}
        title="문의 내역 조회"
        onClose={closeAll}
        labelledById="inquiry-auth-title"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="inquiry-admin-password"
            className="font-jakarta text-body-sm font-semibold text-on-surface"
          >
            비밀번호
          </label>
          <input
            id="inquiry-admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (authError) setAuthError("");
            }}
            aria-invalid={Boolean(authError)}
            aria-describedby={authError ? "inquiry-admin-password-error" : undefined}
            placeholder="비밀번호를 입력하세요"
            className={`h-12 w-full rounded-xl border bg-surface-container-lowest px-4 font-jakarta text-body-md text-on-surface transition-colors placeholder:text-outline focus:outline-none focus:ring-[3px] focus:ring-primary-container/20 ${
              authError
                ? "border-error focus:border-error focus:ring-error/20"
                : "border-outline-variant/30 focus:border-primary-container"
            }`}
          />
          {authError ? (
            <p
              id="inquiry-admin-password-error"
              role="alert"
              className="flex items-center gap-1.5 font-jakarta text-body-sm text-error"
            >
              <Icon name="error" className="text-base" />
              {authError}
            </p>
          ) : null}

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="h-12 flex-1 rounded-xl bg-secondary-container font-sora text-body-md font-bold text-on-secondary-container transition-colors hover:bg-primary-container hover:text-on-primary-container disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "확인 중..." : "확인"}
            </button>
            <button
              type="button"
              onClick={closeAll}
              className="h-12 rounded-xl border border-outline-variant/30 px-6 font-jakarta text-body-md font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
            >
              닫기
            </button>
          </div>
        </form>
      </Modal>

      {/* 2) 게시판 (목록 / 상세) */}
      <Modal
        open={stage === "board"}
        size="lg"
        title={selected ? `문의 상세 · No.${selected.number}` : "파트너 문의 내역"}
        onClose={closeAll}
        labelledById="inquiry-board-title"
      >
        {selected ? (
          <DetailView record={selected} onBack={() => setSelected(null)} />
        ) : (
          <ListView data={data} loading={loading} onSelect={setSelected} onPage={goPage} />
        )}
      </Modal>
    </>
  );
}

function ListView({
  data,
  loading,
  onSelect,
  onPage,
}: {
  data: ListResponse | null;
  loading: boolean;
  onSelect: (r: BoardRecord) => void;
  onPage: (p: number) => void;
}) {
  if (!data) return null;

  if (data.total === 0) {
    return (
      <p className="py-12 text-center font-jakarta text-body-md text-on-surface-variant">
        아직 접수된 문의가 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between font-mono text-label-code text-on-surface-variant">
        <span>총 {data.total}건</span>
        <span>
          {data.page} / {data.totalPages} 페이지
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse font-jakarta text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant/30 text-left text-on-surface-variant">
              <th scope="col" className="w-16 py-2.5 pr-3 font-semibold">번호</th>
              <th scope="col" className="w-40 py-2.5 pr-3 font-semibold">날짜</th>
              <th scope="col" className="py-2.5 pr-3 font-semibold">업체명</th>
              <th scope="col" className="w-56 py-2.5 font-semibold">주요업종</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className="cursor-pointer border-b border-outline-variant/10 transition-colors hover:bg-surface-container-high"
              >
                <td className="py-3 pr-3 font-mono text-on-surface-variant">{item.number}</td>
                <td className="py-3 pr-3 font-mono text-on-surface-variant">
                  {formatDate(item.createdAt)}
                </td>
                <td className="py-3 pr-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(item);
                    }}
                    className="text-left font-semibold text-on-surface underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/50"
                  >
                    {item.companyName}
                  </button>
                </td>
                <td className="py-3 text-on-surface-variant">{item.categoryLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 ? (
        <nav aria-label="페이지" className="flex items-center justify-center gap-1.5 pt-2">
          <PageButton
            label="이전"
            disabled={loading || data.page <= 1}
            onClick={() => onPage(data.page - 1)}
          />
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              disabled={loading}
              aria-current={p === data.page ? "page" : undefined}
              onClick={() => onPage(p)}
              className={`h-9 min-w-9 rounded-xl px-2.5 font-mono text-body-sm transition-colors disabled:opacity-50 ${
                p === data.page
                  ? "bg-primary-container font-bold text-on-primary-container"
                  : "border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {p}
            </button>
          ))}
          <PageButton
            label="다음"
            disabled={loading || data.page >= data.totalPages}
            onClick={() => onPage(data.page + 1)}
          />
        </nav>
      ) : null}
    </div>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-9 rounded-xl border border-outline-variant/30 px-3 font-jakarta text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function DetailView({ record, onBack }: { record: BoardRecord; onBack: () => void }) {
  const rows: [string, string][] = [
    ["번호", String(record.number)],
    ["접수일시", formatDate(record.createdAt)],
    ["업체명 (상호)", record.companyName],
    ["담당자 성함 / 직책", record.contactName],
    ["연락처", record.phone],
    ["주요 업종", record.categoryLabel],
  ];

  return (
    <div className="flex flex-col gap-5">
      <dl className="divide-y divide-outline-variant/10 rounded-xl border border-outline-variant/20">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="font-jakarta text-body-sm font-semibold text-on-surface-variant">
              {label}
            </dt>
            <dd className="font-jakarta text-body-md text-on-surface">
              {label === "연락처" ? (
                <a href={`tel:${value.replace(/[^0-9+]/g, "")}`} className="hover:text-primary">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div>
        <h3 className="mb-2 font-jakarta text-body-sm font-semibold text-on-surface-variant">
          문의 내용 및 희망 제휴 영역
        </h3>
        <p className="min-h-24 whitespace-pre-wrap rounded-xl border border-outline-variant/20 bg-surface-container-lowest/60 p-4 font-jakarta text-body-md text-on-surface">
          {record.message || "— 작성된 내용 없음 —"}
        </p>
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-outline-variant/30 px-5 font-jakarta text-body-md font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
        >
          <Icon name="arrow_back" className="text-lg" />
          목록으로
        </button>
      </div>
    </div>
  );
}
