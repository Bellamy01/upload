export default function Footer() {
    return (
        <div className="border-2 gap-2 border-x-0 border-main flex flex-col items-center justify-center py-2 border-b-0 bg-orange-50">
            <div className="flex gap-1 items-center justify-center text-xs">
                <p>Guidelines</p>
                <p>|</p>
                <p>FAQ</p>
                <p>|</p>
                <p>Lists</p>
                <p>|</p>
                <p>Contact</p>
            </div>
            <div className="flex items-center justify-center gap-1">
                <p>Search: </p>
                <input type="text" className="border border-black w-32 h-5" />
            </div>
        </div>
    )
}
