import { useState } from "react";
import { trpc } from "../lib/trpc";
import { Users, Activity, FileText, TrendingUp, ChevronDown, ChevronUp, Download, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AdminDashboard() {
    const [, setLocation] = useLocation();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedModule, setSelectedModule] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set());

    // Verificar se o usuário é admin
    const { data: currentUser } = trpc.auth.getCurrentUser.useQuery();
    const { data: users = [] } = trpc.admin.getAllUsers.useQuery(undefined, {
        enabled: currentUser?.role === "admin",
    });
    const { data: stats } = trpc.admin.getPlatformStats.useQuery(undefined, {
        enabled: currentUser?.role === "admin",
    });
    const { data: allResponses = [] } = trpc.admin.getAllResponses.useQuery(undefined, {
        enabled: currentUser?.role === "admin",
    });
    const { data: userDetails } = trpc.admin.getUserDetails.useQuery(
        { userId: selectedUserId! },
        { enabled: !!selectedUserId && currentUser?.role === "admin" }
    );

    // Redirecionar se não for admin
    if (currentUser && currentUser.role !== "admin") {
        setLocation("/dashboard");
        return null;
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    const toggleUserExpansion = (userId: number) => {
        const newExpanded = new Set(expandedUsers);
        if (newExpanded.has(userId)) {
            newExpanded.delete(userId);
        } else {
            newExpanded.add(userId);
        }
        setExpandedUsers(newExpanded);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredResponses = selectedModule === "all"
        ? allResponses
        : allResponses.filter((r) => r.moduleId === selectedModule);

    const exportToCSV = () => {
        const headers = ["Usuário", "Email", "Módulo", "Exercício", "Resposta", "Data"];
        const rows = allResponses.map((r) => [
            r.userName || "",
            r.userEmail || "",
            r.moduleId,
            r.exerciseId,
            r.response || "",
            r.updatedAt ? new Date(r.updatedAt).toLocaleString("pt-BR") : "",
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `mtu-respostas-${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
                            <p className="text-sm text-gray-600 mt-1">Plataforma MTU™</p>
                        </div>
                        <Link href="/dashboard">
                            <a className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                Voltar ao Dashboard
                            </a>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalUsers || 0}</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.activeUsers || 0}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Activity className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total de Respostas</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalResponses || 0}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Módulos Completos</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.completedModules || 0}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Progresso Médio</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.averageProgress || 0}%</p>
                            </div>
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Usuários Cadastrados</h2>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar usuário..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Método de Login
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cadastro
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Último Acesso
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <span className="text-purple-600 font-semibold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    {user.role === "admin" && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                            Admin
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.loginMethod === "local" ? "Email/Senha" : "OAuth"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.lastSignedIn ? new Date(user.lastSignedIn).toLocaleDateString("pt-BR") : "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => toggleUserExpansion(user.id)}
                                                className="text-purple-600 hover:text-purple-900 font-medium flex items-center gap-1"
                                            >
                                                {expandedUsers.has(user.id) ? (
                                                    <>
                                                        <ChevronUp className="w-4 h-4" />
                                                        Ocultar
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-4 h-4" />
                                                        Ver Respostas
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Responses Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Todas as Respostas</h2>
                            <div className="flex items-center gap-4">
                                <select
                                    value={selectedModule}
                                    onChange={(e) => setSelectedModule(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="all">Todos os Módulos</option>
                                    <option value="modulo-1">Módulo 1</option>
                                    <option value="modulo-2a">Módulo 2A</option>
                                    <option value="modulo-2b">Módulo 2B</option>
                                    <option value="modulo-3">Módulo 3</option>
                                    <option value="modulo-4">Módulo 4</option>
                                    <option value="bonus-1">Bônus 1</option>
                                    <option value="bonus-2">Bônus 2</option>
                                </select>
                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Exportar CSV
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                            {filteredResponses.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">Nenhuma resposta encontrada.</p>
                            ) : (
                                filteredResponses.map((response) => (
                                    <div key={response.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="font-semibold text-gray-900">{response.userName}</p>
                                                <p className="text-sm text-gray-500">{response.userEmail}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-purple-600">{response.moduleId}</p>
                                                <p className="text-xs text-gray-500">{response.exerciseId}</p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded p-3 mt-2">
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{response.response}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Atualizado em: {response.updatedAt ? new Date(response.updatedAt).toLocaleString("pt-BR") : "-"}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
