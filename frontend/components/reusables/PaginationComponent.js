import React from 'react';
import Pagination from 'rc-pagination';
import { Icon } from '@iconify/react';

const PaginationComponent = ({ total, current, pageSize, onChange, showSizeChanger = false }) => {
    const PrevNextArrow = (current, type, originalElement) => {
        if (type === "prev") {
            return <button><Icon icon="fluent:arrow-left-48-regular"/></button>;
        }
        if (type === "next") {
            return <button><Icon icon="fluent:arrow-right-48-regular" /></button>;
        }
        return originalElement;
    };

    return (
        <Pagination
            className="pagination-data"
            showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
            onChange={onChange}
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger={showSizeChanger}
            itemRender={PrevNextArrow}
        />
    );
};

export default PaginationComponent;
