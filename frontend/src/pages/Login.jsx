import { useState } from "react";
import { useLoginMutation } from "@/services/usersApi";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import AuthLayout from "@/components/layouts/AuthLayout";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [Login] = useLoginMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Login(form).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout title="Enter Details to Login">

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label className={"mb-1"}>Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className={"mb-1"}>Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        <Button className="w-full">
          Login
        </Button>

      </form>

    </AuthLayout>
  );
}

export default Login;