import Input from "@/components/loginForm";
import { useRouter } from "next/router";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const router = useRouter();

  const Login = () => {
    router.push("/login");
  };
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black/50 w-full h-full">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign Up</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="User Name"
                onChange={(ev) => {
                  setUserName(ev.target.value);
                }}
                id="username"
                type="username"
                value={username}
              />

              <Input
                label="Email"
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={async () => {
                const res = await fetch("/api/signup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password, username }),
                });

                if (res.ok) {
                  router.push("/done");
                } else {
                  const data = await res.json();
                  alert(data.message);
                }
              }}
            >
              Signup
            </button>

            <p className="text-neutral-500 mt-12">
              Already have an account?
              <span
                onClick={Login}
                className="text-white mt-1 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
