import { useState } from "react";
import { useRegisterMutation } from "@/services/usersApi";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import AuthLayout from "@/components/layouts/AuthLayout";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

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
      await register(form).unwrap();
      navigate("/habits");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout title="Create an account">

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label className={"mb-1"}>Name</Label>
          <Input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

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
          Register
        </Button>

      </form>

    </AuthLayout>
  );
}

export default Register;