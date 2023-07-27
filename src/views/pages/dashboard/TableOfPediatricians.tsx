import React, { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';

interface TableOfPediatriciansProps {
  value: string;
  handleFilter: (val: string) => void;
  cityValue: string;
  setSelectedPediatrician: (pediatrician: TableBodyRowType | null) => void;
}

interface Sentiments {
  label: string;
  score: number;
}

export interface TableBodyRowType {
  _id: string;
  name: string;
  address: string;
  avatarSrc?: string;
  reviews_count: number;
  reviews_average: number;
  phone_number: string;
  latitude: number;
  longitude: number;
  city: string;
  sentiments: Sentiments[];
  category:string
}

const TableOfPediatricians = (props: TableOfPediatriciansProps): React.ReactElement => {
  const { value, handleFilter, cityValue, setSelectedPediatrician } = props;
  const [filteredPediatriciansData, setFilteredPediatriciansData] = useState<TableBodyRowType[]>([]);
  const [pediatriciansData, setPediatriciansData] = useState<TableBodyRowType[]>([]);
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [selectedRow, setSelectedRow] = useState<TableBodyRowType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;

  const handleRowClick = (row: TableBodyRowType) => {
    setSelectedRow(row === selectedRow ? null : row);
    setSelectedPediatrician(row === selectedRow ? null : row);
  };

  useEffect(() => {
    const fetchPediatricians = async () => {
      try {
        const response = await fetch('http://localhost:8000/pediatres');
        const data = await response.json();
        setPediatriciansData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des pédiatres :', error);
      }
    };

    fetchPediatricians();
  }, []);

  useEffect(() => {
    if (cityValue === 'All') {
      setFilteredPediatriciansData(pediatriciansData);
    } else {
      const filteredData = pediatriciansData.filter((pediatrician) => pediatrician.city === cityValue);
      setFilteredPediatriciansData(filteredData);
    }
  }, [cityValue, pediatriciansData]);

  const renderUserAvatar = (row: TableBodyRowType) => {
    if (row.avatarSrc) {
      return <img src={row.avatarSrc} alt="Avatar" style={{ width: 30, height: 30, marginRight: 3 }} />;
    } else {
      return (
        <div
          style={{
            width: 30,
            height: 30,
            marginRight: 3,
            backgroundColor: '#e0e0e0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '.8rem' }}>{row.name ? row.name[0] : 'JD'}</span>
        </div>
      );
    }
  };
  const renderSentimentsLabel = (sentiment: Sentiments) => {
    const labelStyle = {
      padding: '2px 6px',
      borderRadius: '4px',
      marginRight: '5px',
      fontSize: '12px',
      fontWeight: 'bold',
    };

    let backgroundColor = '#FFFFFF'; // Default background color
    if (sentiment.label =='POSITIVE' ) {
      backgroundColor = '#4CAF50'; // Green color for positive sentiments
    } else if (sentiment.label =='NEGATIVE') {
      backgroundColor = '#FF5733'; // Red color for negative sentiments
    }

    const labelContainerStyle = {
      ...labelStyle,
      backgroundColor,
    };

    return (
      <span style={labelContainerStyle}>
        {sentiment.label}
      </span>
    );
  };
  const getRowId = (row: TableBodyRowType) => row._id;


 // Calculate the total number of pages
 const totalPages = Math.ceil(filteredPediatriciansData.length / rowsPerPage);

 // Function to handle pagination button clicks
 const handlePageChange = (event: unknown, newPage: number) => {
   setCurrentPage(newPage + 1); // Add +1 here to adjust the page number since MUI uses 0-based indexing
 };

  // Calculate the index of the first row on the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  // Slice the filtered data to display only the rows for the current page
  const displayedRows = filteredPediatriciansData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div style={{ height: 500, width: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{borderRadius: '100px', boxShadow: '0px 4px 8px -4px rgba(58, 53, 65, 0.42)', backgroundImage: 'linear-gradient(98deg, #C6A7FE, #014BAC 94%)'  , color: 'white' }}>Name</th>
            <th style={{borderRadius: '100px',  boxShadow: '0px 4px 8px -4px rgba(58, 53, 65, 0.42)', backgroundImage: 'linear-gradient(98deg, #C6A7FE, #014BAC 94%)', color: 'white' }}>Phone</th>

          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row) => (
            <React.Fragment key={row._id}>
              <TableRow onClick={() => handleRowClick(row)}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renderUserAvatar(row)}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ marginBottom: -5, fontWeight: 600, fontSize: '0.875rem' }}>{row.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span style={{ fontSize: '0.875rem' }}>{row.phone_number}</span>
                </TableCell>
              </TableRow>
              {selectedRow === row && (
        <TableRow>
          <TableCell colSpan={2}>
            <div>
              <p>Address: {row.address}</p>
              <div>
                <div>
                Sentiments:
                  {row.sentiments.map((sentiment) => (
                    renderSentimentsLabel(sentiment)
                  ))}
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>
      <TablePagination
       component="div"
       count={filteredPediatriciansData.length}
       page={currentPage - 1}
       onPageChange={handlePageChange}
       rowsPerPage={rowsPerPage}
       rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default TableOfPediatricians;
