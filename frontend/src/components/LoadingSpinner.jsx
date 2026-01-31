const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-primary rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium animate-pulse">Loading notes...</p>
        </div>
    );
};

export default LoadingSpinner;