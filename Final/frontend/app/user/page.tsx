import axios from "axios";

export default async function ShowData() {
    const response = await axios.get("http://localhost:3000/volunteers/5");
    const data = response.data;

    if (Array.isArray(data)) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">Volunteer Data</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left text-white">ID</th>
                                    <th className="px-4 py-2 text-left text-white">Nickname</th>
                                    <th className="px-4 py-2 text-left text-white">Email</th>
                                    <th className="px-4 py-2 text-left text-white">Experience</th>
                                    <th className="px-4 py-2 text-left text-white">Skills</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user: any, index: number) => (
                                    <tr
                                        key={user.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b`}
                                    >
                                        <td className="px-4 py-2 text-gray-700">{user.id}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.nickName}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.email}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.experience}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.skills}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        // Single user display
        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">Volunteer Details</h2>
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-left text-white">Field</th>
                                <th className="px-4 py-2 text-left text-white">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2 text-gray-700">ID</td>
                                <td className="px-4 py-2 text-gray-700">{data.id}</td>
                            </tr>
                            <tr className="bg-gray-100 border-b">
                                <td className="px-4 py-2 text-gray-700">Nickname</td>
                                <td className="px-4 py-2 text-gray-700">{data.nickName}</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2 text-gray-700">Email</td>
                                <td className="px-4 py-2 text-gray-700">{data.email}</td>
                            </tr>
                            <tr className="bg-gray-100 border-b">
                                <td className="px-4 py-2 text-gray-700">Experience</td>
                                <td className="px-4 py-2 text-gray-700">{data.experience}</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2 text-gray-700">Skills</td>
                                <td className="px-4 py-2 text-gray-700">{data.skills}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
