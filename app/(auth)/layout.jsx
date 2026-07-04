export default function AuthLayout({ children }) {
    return (
        <main className="min-h-screen bg-(--bg-color)">
            {children}
        </main>
    );
}