import { SignUp } from "@clerk/nextjs";

export default function page() {
  return (
    <main className="flex justify-center">
      <SignUp />
    </main>
  );
}
