/**
 * PM2 설정 (자체 우분투 서버 배포용)
 *
 * 사용:
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *
 * 주의 — instances 는 반드시 1, exec_mode 는 fork 여야 합니다.
 * 문의 저장이 "파일 읽기 → 배열에 추가 → 다시 쓰기" 방식이라 프로세스 안에서만
 * 순서를 보장합니다. cluster 로 2개 이상 띄우면 동시 접수 시 문의가 유실되고
 * 파일이 깨질 수 있습니다.
 *
 * 비밀번호(INQUIRY_ADMIN_PASSWORD)는 여기에 넣지 마세요. 이 파일은 커밋되므로
 * 저장소에 노출됩니다. 프로젝트 루트의 .env.production.local 에 두면
 * next start 가 알아서 읽습니다.
 */
module.exports = {
  apps: [
    {
      name: "autrin-landing",
      // 홈 디렉토리를 앱 루트로 쓰는 구성. 배포 경로가 다르면 여기만 바꾸세요.
      cwd: "/home/autrin-landding",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3066",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "500M",
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
