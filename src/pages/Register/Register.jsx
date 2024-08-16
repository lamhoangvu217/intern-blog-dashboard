import { Button, Label, TextInput } from "flowbite-react";
import { supabase } from "../../config/supabase";

function Register() {
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: "lambeobn@gmail.com",
      password: "12345678",
    });
    console.log('data', data, error);
  }
  const handleRegister = () => {
    signUpNewUser()
  }
  return (
    <div className="flex flex-col max-w-xl w-full items-center">
      <h1 className="text-3xl font-bold">Đăng ký</h1>
      <form className="flex max-w-xl w-full flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <Button type="button" onClick={handleRegister}>Submit</Button>
      </form>
    </div>
  );
}

export default Register;
