import type { HTMLAttributes, FC } from 'react';
import React, { useState } from 'react';
import * as CSS from 'csstype';
import './Table.css';

export interface Props extends HTMLAttributes<HTMLHRElement> {
    /** width of desired table */
    width?: CSS.Property.Width;
    /** height of table in pixels */
    height?: CSS.Property.Height;
    /** Defines how many rows to show per page */
    pageSize?: number;
    /** Defines number of page to start from */
    pageNum?: number;
    /** Defines the name of colloumns in the header */
    colNames?: [];
    /** Data in JSON to feed the table */
    data?: JSON[];
}
const btnStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
};
/**
 * Component that serves as an table for ease of templating
 *
 * @return Table component
 */
export const Table: FC<Props> = ({
    data = [
        { id: 1, name: 'Name1', Age: 30 },
        { id: 1, name: 'Name2', Age: 30 },
        { id: 1, name: 'Name3', Age: 30 },
        { id: 1, name: 'Name4', Age: 30 },
        { id: 1, name: 'Name5', Age: 30 },
        { id: 1, name: 'Name6', Age: 30 },
        { id: 1, name: 'Name7', Age: 30 },
        { id: 1, name: 'Name8', Age: 30 },
        { id: 1, name: 'Name9', Age: 30 },
        { id: 1, name: 'Name10', Age: 30 },
        { id: 1, name: 'Name11', Age: 30 },
        { id: 1, name: 'Name12', Age: 30 },
        { id: 1, name: 'Name13', Age: 30 },
        { id: 1, name: 'Name14', Age: 30 },
        { id: 1, name: 'Name15', Age: 30 },
        { id: 1, name: 'Name16', Age: 30 },
        { id: 1, name: 'Name17', Age: 30 },
        { id: 1, name: 'Name18', Age: 30 },
    ],
    colNames = ['id', 'name', 'Age'],
    pageNum = 0,
    pageSize = 15,
    width = '100%',
    height = '100%',
}) => {
    const [page, setPage] = useState(pageNum);

    /** Function to navigate back to the last page */
    const onBack = (): void => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    /** Function to navigate back to the next page */
    const onNext = (): void => {
        setPage(page + 1 < data.length / pageSize ? page + 1 : page);
    };
    return (
        <div className="apollo-component-library-table-component-container">
            {data.length > 0 && (
                <table
                    className="apollo-component-library-table-component"
                    cellSpacing="0"
                    style={{ width: width, height: height }}
                >
                    <thead className="header">
                        <tr>
                            {colNames.map(
                                (headerItem: string, index: React.Key | null | undefined) => (
                                    <th key={index}>{headerItem.toUpperCase()}</th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data.slice(pageSize * page, pageSize * page + pageSize)).map(
                            (obj, index) => (
                                <tr key={index}>
                                    {Object.values(obj).map((value, index2) => (
                                        <td key={index2}> {value} </td>
                                    ))}
                                </tr>
                            )
                        )}
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td className="apollo-component-library-table-component-footer">
                            <button style={btnStyle} onClick={onBack}>
                                Back
                            </button>
                            <label style={{ padding: '0 1em' }}>{page + 1}</label>
                            <button style={btnStyle} onClick={onNext}>
                                Next
                            </button>
                        </td>
                        <td></td>
                    </tfoot>
                </table>
            )}
        </div>
    );
};