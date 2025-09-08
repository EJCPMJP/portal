@'
export { handlers as GET, handlers as POST } from "@/lib/auth";
'@ | Set-Content .\src\app\api\auth\[...nextauth]\route.ts -Encoding utf8
