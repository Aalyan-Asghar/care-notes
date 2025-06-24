export default function PaginationNotes() {

    const [page, setPage] = useState(0)
    const limit = 50

    useEffect(() => {
        getNotes(limit, page * limit)
            .then(data => {
                console.log("Fetched note IDs:", data.map(n => n.id)) // 👈 check IDs
                setNotes(prev => [...prev, ...data])
            })
            .catch(err => console.error("Fetch failed:", err))
    }, [page])

    return (
        <main>
            <button onClick={() => setPage(p => p + 1)}>Load More</button>
        </main>
    )
}