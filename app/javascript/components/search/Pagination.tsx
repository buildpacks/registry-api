import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

interface PaginationProps {
    totalCount: number
    startIndex: number
    limit: number
}

function calcCurrentPage(props: PaginationProps): number {
    return props.limit === 0 ? 1 : Math.ceil((props.startIndex + 1) / props.limit)
}

function calcNumberOfPages(props: PaginationProps): number {
    return props.limit === 0 ? 1 : Math.ceil(props.totalCount / props.limit)
}

const PAGE_HIDE = 0
const PAGE_ELLIPSIS = -1

export const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    let numbOfPages = calcNumberOfPages(props)
    let currentPage = calcCurrentPage(props)

    let pages = Array.from({ length: numbOfPages }, (_, i) => i + 1)
        .map(i => {
            switch (i) {
                case 1:
                case currentPage - 1:
                case currentPage:
                case currentPage + 1:
                case numbOfPages:
                    return i;
                case 2:
                case numbOfPages - 1:
                    return PAGE_ELLIPSIS;
                default:
                    return PAGE_HIDE;
            }
        })
        .filter(i => i !== PAGE_HIDE)
        .map((i, k) => {
            if (i === PAGE_ELLIPSIS) {
                return (<Button key={k} className="rounded mr-2" disabled={true} variant="light">...</Button>)
            } else {
                return (<Button key={k} className="rounded mr-2" variant="outline-secondary" active={currentPage === i}>{i}</Button>)
            }
        })

    return (
        <ButtonToolbar>
            {pages}
        </ButtonToolbar>
    );
}
