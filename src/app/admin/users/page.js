"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { Loader2, Search, ShieldCheck, UserCog, Users } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (res.ok) {
        // Ensure data is an array before setting state
        setUsers(Array.isArray(data) ? data : []);
      } else {
        // This will trigger if the status is 403 (Unauthorized)
        console.error("Fetch Error:", data.error);
        toast.error(data.error || "Failed to load users");
        setUsers([]);
      }
    } catch (err) {
      console.error("Connection Error:", err);
      toast.error("Connection error. Check console.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const loadingToast = toast.loading(`Updating to ${newRole}...`);
    try {
      const res = await fetch("/api/admin/users/update-role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (res.ok) {
        toast.success(`User promoted to ${newRole}!`, { id: loadingToast });
        fetchUsers();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update role", {
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Server connection error", { id: loadingToast });
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 w-full pt-20 md:pt-0 p-4 md:p-12 space-y-8 overflow-x-hidden">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#003366]">
              User Management
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Manage staff and participant permissions.
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] outline-none transition-all shadow-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
          {loading ? (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-[#C5A059]" size={48} />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Loading Users...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-6">User Details</th>
                    <th className="px-8 py-6">Current Role</th>
                    <th className="px-8 py-6 text-center">
                      Change Permissions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50/30 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-[#003366]">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold text-[#003366] truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-slate-400 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 uppercase font-black text-[10px]">
                          <span
                            className={
                              user.role === "ADMIN"
                                ? "text-red-500"
                                : user.role === "REVIEWER"
                                  ? "text-emerald-500"
                                  : "text-blue-500"
                            }
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() =>
                                handleRoleChange(user.id, "RESEARCHER")
                              }
                              className="p-3 hover:bg-slate-100 rounded-xl transition-all"
                              title="Researcher"
                            >
                              <Users size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleRoleChange(user.id, "REVIEWER")
                              }
                              className="p-3 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-all"
                              title="Reviewer"
                            >
                              <UserCog size={20} />
                            </button>
                            <button
                              onClick={() => handleRoleChange(user.id, "ADMIN")}
                              className="p-3 hover:bg-red-50 text-red-600 rounded-xl transition-all"
                              title="Admin"
                            >
                              <ShieldCheck size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-8 py-20 text-center text-slate-400 font-medium italic"
                      >
                        No users found. Check server logs if this is unexpected.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
