import { useEffect, useState } from "react";
import logokecil from "../../assets/logokecilbewarna.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTokenCustomer } from "../../utils/cookies";
import { register } from "../../redux/features/auth/authThunks";
const RegisterCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const token = getTokenCustomer();
    if (token) {
      navigate("/home");
    }
  }, [navigate]);
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/home");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    dispatch(
      register({
        user_name: name,
        user_email: email,
        user_password: password,
        user_role: "customer",
      })
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col font-roboto">
      <div className="flex justify-start items-center mx-3 my-1">
        <img src={logokecil} alt="Logo" className="w-20 md:w-1/12 lg:w-29" />
        <h1 className="text-2xl lg:text-3xl">BrainStore</h1>
      </div>
      <div className="flex justify-center items-center mb-3">
        <div className="rounded-xl bg-primary shadow-md p-8 w-3/4 lg:w-2/4 text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-1 text-center">Register</h2>
          {auth.loading && <div className="rounded-md  text-center bg-gray-500 mb-4 text-white-500">Loading...</div>}
          {auth.error && <div className="rounded-md  text-center bg-red-500 mb-4 text-white-500">{auth.error.msg}</div>}
          {error && <div className="rounded-md  text-center bg-red-500 mb-4 text-white-500">{error}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-1">
              <label className="block mb-1 lg:text-xl" htmlFor="name">
                Name
              </label>
              <input type="text" id="name" className="w-full p-2 text-secondary rounded mb-1" value={name} onChange={(e) => setName(e.target.value)} required />
              <label className="block mb-1 lg:text-xl" htmlFor="email">
                Email
              </label>
              <input type="email" id="email" className="w-full p-2 text-secondary rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-1 relative">
              <label className="block mb-1 lg:text-xl" htmlFor="password">
                Password
              </label>
              <input type={showPassword ? "text" : "password"} id="password" className="w-full p-2 text-secondary rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-9 lg:top-10 text-secondary">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-1 lg:text-xl" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input type={showPassword ? "text" : "password"} id="confirmPassword" className="w-full p-2 text-secondary rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-9 lg:top-10 text-secondary">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="w-1/2 bg-secondary hover:opacity-90 text-white py-2 px-4 rounded lg:text-2xl">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <div className="mt-2">
              Already have an account?
              <Link to="/login" className="text-secondary ml-2 hover:underline">
                Login!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
