const Footer = () => {
    return (
        <footer className="border-t border-gray-100 py-8 mt-auto bg-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} NoteFlow. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0 font-medium">
                    <a href="#" className="hover:text-primary transition">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;