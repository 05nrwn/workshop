import React, { useState, useMemo } from 'react';
import styles from './DataList.module.css';
const DataList = ({ data, resourceType, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    // Filter dan sort data
    const filteredAndSortedData = useMemo(() => {
        if (!data) return [];
        let filteredData = data;
        // Filter berdasarkan search term
        if (searchTerm) {
            filteredData = filteredData.filter(item =>
                Object.values(item).some(value =>
                    value &&
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        // Sort data
        filteredData = [...filteredData].sort((a, b) => {
            if (sortBy === 'id') return a.id - b.id;
            if (sortBy === 'title' && a.title && b.title) {
                return a.title.localeCompare(b.title);
            }
            if (sortBy === 'name' && a.name && b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
        return filteredData;
    }, [data, searchTerm, sortBy]);
    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length /
        itemsPerPage);
    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedData.slice(startIndex, startIndex +
            itemsPerPage);
    }, [filteredAndSortedData, currentPage, itemsPerPage]);
    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    // Render card content berdasarkan resource type
    const renderCardContent = (item) => {
        switch (resourceType) {
            case 'posts':
                return (
                    <>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardId}>{item.id}</div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                        </div>
                        <p className={styles.cardBody}>{item.body}</p>
                        <div className={styles.cardFooter}>
                            <span>User ID: {item.userId}</span>
                            <span className={styles.userBadge}>Post</span>
                        </div>
                    </>
                );
            case 'comments':
                return (
                    <>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardId}>{item.id}</div>
                            <h3 className={styles.cardTitle}>{item.name}</h3>
                            <p className={styles.cardEmail}>{item.email}</p>
                        </div>
                        <p className={styles.cardBody}>{item.body}</p>
                        <div className={styles.cardFooter}>
                            <span>Post ID: {item.postId}</span>
                            <span className={styles.userBadge}>Comment</span>
                        </div>
                    </>
                );
            case 'users':
                return (
                    <>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardId}>{item.id}</div>
                            <h3 className={styles.cardTitle}>{item.name}</h3>
                            <p className={styles.cardEmail}>{item.email}</p>
                        </div>
                        <p className={styles.cardBody}>
                            📞 {item.phone}<br />
                            🌐 {item.website}<br />
                            🏢 {item.company?.name}
                        </p>
                        <div className={styles.cardFooter}>
                            <span>{item.address?.city}</span>
                            <span className={styles.userBadge}>User</span>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardId}>{item.id}</div>
                            <h3 className={styles.cardTitle}>{item.title ||
                                item.name}</h3>
                        </div>
                        <p className={styles.cardBody}>
                            {JSON.stringify(item, null, 2).slice(0, 150)}...
                        </p>
                        <div className={styles.cardFooter}>
                            <span>ID: {item.id}</span>
                            <span
                                className={styles.userBadge}>{resourceType}</span>
                        </div>
                    </>
                );
        }
    };
    if (loading) {
        return null; // Loading ditangani oleh parent component
    }
    if (!data || data.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>📭</div>
                <h3>No Data Available</h3>
                <p>Please select a different resource type or try
                    again.</p>
            </div>
        );
    }
    return (
        <div className={styles.listContainer}>
            {/* Header dengan search dan filter */}
            <div className={styles.listHeader}>
                <h2 className={styles.listTitle}>
                    📊 {filteredAndSortedData.length} {resourceType} found</h2>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder={`Search ${resourceType}...`}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset ke page 1 saat search
                        }}
                        className={styles.searchInput}
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="id">Sort by ID</option>
                        <option value="title">Sort by Title</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>
            </div>
            {/* Data Grid */}
            <div className={styles.dataGrid}>
                {currentData.map((item) => (
                    <div key={item.id} className={styles.dataCard}>
                        {renderCardContent(item)}
                    </div>
                ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={styles.paginationButton}
                    >
                        ← Previous
                    </button>
                    <span className={styles.paginationInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={styles.paginationButton}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};
export default DataList;
