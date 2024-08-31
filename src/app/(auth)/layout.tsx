const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex items-center justify-center w-full max-w-7xl bg-dark-secondary min-h-screen">
            {children}
        </section>
    );
};

export default AuthLayout;