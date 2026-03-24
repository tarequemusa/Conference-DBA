export default function Organizers() {
  const team = [
    {
      name: "Dr. Sayeed Alam",
      role: "Conference Chair",
      dept: "Dept. of SCM, EWU",
    },
    {
      name: "Prof. Sarah Hunter",
      role: "Program Co-Chair",
      dept: "Logistics Specialist",
    },
    { name: "Mr. Tanvir Ahmed", role: "Organizing Secretary", dept: "EWU" },
  ];

  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#003366] mb-12">
          Meet Our Conference Organizers
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl hover:shadow-lg transition bg-slate-50"
            >
              <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold text-xl">{member.name}</h3>
              <p className="text-[#C5A059] font-medium">{member.role}</p>
              <p className="text-slate-500 text-sm">{member.dept}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
