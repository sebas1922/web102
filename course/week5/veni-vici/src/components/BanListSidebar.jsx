const BanListSidebar = ({ banList, className }) => {
    
    return (
        <aside className={className}>
            <h3>Banned Attributes</h3>
            {Object.entries(banList).map(([attribute, values]) => (
                values.length > 0 && (
                    <div key={attribute} className="ban-category">
                        <h4>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</h4>
                        <ul>
                            {values.map((value, index) => (
                                <li key={`${value}-${index}`}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )
            ))}
        </aside>
    )
}

export default BanListSidebar