"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  CheckCircle,
  Download,
  Filter,
  Landmark,
  Loader2,
  MoreVertical,
  Search,
  ShieldCheck,
  UserCog,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) setUsers(Array.isArray(data) ? data : []);
      else toast.error(data.error || "Failed to load users");
    } catch (err) {
      toast.error("Connection error. Check database status.");
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
        toast.success(`Role updated successfully!`, { id: loadingToast });
        fetchUsers();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update role", {
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Server error", { id: loadingToast });
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    const actionText = newStatus ? "ACTIVATE" : "DEACTIVATE";
    const loadingToast = toast.loading(`PERFORMING BULK ${actionText}...`);

    try {
      const res = await fetch("/api/admin/users/bulk-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedUsers, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`${selectedUsers.length} USERS UPDATED`, {
          id: loadingToast,
        });
        setSelectedUsers([]);
        fetchUsers();
      } else {
        throw new Error("Bulk update failed");
      }
    } catch (err) {
      toast.error("SERVER ERROR DURING BULK ACTION", { id: loadingToast });
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) setSelectedUsers([]);
    else setSelectedUsers(filteredUsers.map((u) => u.id));
  };

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id],
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER (Matching Image Style) --- */}
        <header className="h-32 bg-[#001A41] flex flex-col justify-center px-10 shadow-2xl shrink-0 z-20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                  User Directory
                </h1>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
                  Administrative Privileges & Access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedUsers.length > 0 && (
                <div className="flex items-center gap-2 mr-4 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => handleBulkStatusChange(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 border border-emerald-600/20 text-emerald-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <CheckCircle size={14} /> Activate ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                  >
                    <XCircle size={14} /> Deactivate
                  </button>
                </div>
              )}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#001A41] transition-all">
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC FILTER BAR --- */}
        <div className="bg-white border-b border-slate-100 p-4 px-10 flex flex-wrap items-center gap-4 shadow-sm z-10">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-[#C5A059]/10 outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider outline-none"
              >
                <option value="ALL">All Roles</option>
                <option value="RESEARCHER">Researchers</option>
                <option value="REVIEWER">Reviewers</option>
                <option value="AUTHORITY">Authority</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

            {loading ? (
              <div className="py-32 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#003366]" size={40} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Accessing Secure Records...
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 w-10">
                        <input
                          type="checkbox"
                          checked={
                            selectedUsers.length === filteredUsers.length &&
                            filteredUsers.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-[#C5A059] focus:ring-[#C5A059]"
                        />
                      </th>
                      <th className="px-4 py-5">Full Credentials</th>
                      <th className="px-8 py-5">Access Status</th>
                      <th className="px-8 py-5 text-center">
                        Modify Privileges
                      </th>
                      <th className="px-8 py-5 text-right">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className={`hover:bg-slate-50/30 transition-colors group ${selectedUsers.includes(user.id) ? "bg-amber-50/30" : ""}`}
                      >
                        <td className="px-8 py-5">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelect(user.id)}
                            className="rounded border-slate-300 text-[#C5A059] focus:ring-[#C5A059]"
                          />
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#003366]/5 flex items-center justify-center font-black text-[#003366] border border-slate-100 uppercase">
                              {user.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="text-[#003366] text-sm font-bold">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          {user.isActive !== false ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest shadow-sm">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />{" "}
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-100 bg-red-50 text-red-600 text-[8px] font-black uppercase tracking-widest shadow-sm">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />{" "}
                              Deactivated
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center items-center gap-1 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100 w-fit mx-auto shadow-inner">
                            {[
                              {
                                r: "RESEARCHER",
                                icon: Users,
                                bg: "bg-blue-600",
                              },
                              {
                                r: "REVIEWER",
                                icon: UserCog,
                                bg: "bg-emerald-600",
                              },
                              {
                                r: "AUTHORITY",
                                icon: Landmark,
                                bg: "bg-amber-600",
                              },
                              {
                                r: "ADMIN",
                                icon: ShieldCheck,
                                bg: "bg-red-600",
                              },
                            ].map((btn) => {
                              const isActive = user.role === btn.r;
                              return (
                                <button
                                  key={btn.r}
                                  onClick={() =>
                                    handleRoleChange(user.id, btn.r)
                                  }
                                  className={`p-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                                    isActive
                                      ? `${btn.bg} text-white shadow-lg scale-105 z-10`
                                      : `text-slate-300 hover:text-slate-500 grayscale hover:grayscale-0`
                                  }`}
                                  title={btn.r}
                                >
                                  <btn.icon size={16} />
                                  {isActive && (
                                    <span className="text-[8px] font-black tracking-widest pr-1">
                                      ACTIVE
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2.5 text-slate-300 hover:text-[#003366] hover:bg-slate-100 rounded-xl transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
