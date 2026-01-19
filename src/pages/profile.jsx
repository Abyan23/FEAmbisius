import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../services/auth";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setProfile(res.data || {});
      setEditName(res.data?.name || "");
      setEditEmail(res.data?.email || "");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal memuat profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await updateProfile(editName, editEmail);
      toast.success("Profile berhasil diperbarui!");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal memperbarui profile");
    }
  };

  const handleChangePassword = async () => {
    try {
    await changePassword(oldPassword, newPassword);
      toast.success("Password berhasil diganti!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal mengganti password");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex justify-center items-start min-h-screen p-5">
      <div className="bg-[#FCF8F8] w-full max-w-md border-2 border-gray-400 rounded-lg p-5">
        <h1 className="text-2xl font-bold mb-5">Profile</h1>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Edit Profile</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Change Password</h2>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleChangePassword}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
