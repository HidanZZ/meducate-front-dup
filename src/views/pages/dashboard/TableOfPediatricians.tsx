import { ReactElement, useEffect, useState } from 'react'
import { GridColDef, DataGrid } from '@mui/x-data-grid'

interface TableOfPediatriciansProps {
  value: string
  handleFilter: (val: string) => void
  cityValue: string
  setSelectedPediatrician: (pediatrician: TableBodyRowType | null) => void; // Updated prop type

}

interface Sentiments {
  label: string;
  score: number;
}


export interface TableBodyRowType {
  _id: number
  name: string
  address: string
  avatarSrc?: string
  reviews_count: number
  reviews_average: number
  phone_number: number
  latitude: number;
  longitude: number;
  city: string
  sentiments:Sentiments[]
}

interface CellType {
  row: TableBodyRowType
}

const TableOfPediatricians = (props: TableOfPediatriciansProps): ReactElement => {
  const { value, handleFilter, cityValue,setSelectedPediatrician } = props

  // Handle row click event
  const handleRowClick = (params: any) => {
    setSelectedPediatrician(params.row); 
  };

  const [filteredPediatriciansData, setFilteredPediatriciansData] = useState<TableBodyRowType[]>([])
  const [pediatriciansData, setPediatriciansData] = useState<TableBodyRowType[]>([])

  useEffect(() => {
    const fetchPediatricians = async () => {
      try {
        const response = await fetch('http://localhost:8000/pediatres')
        const data = await response.json()
        setPediatriciansData(data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données des pédiatres :', error)
      }
    }

    fetchPediatricians()
  }, [])

  useEffect(() => {

    if (cityValue === 'All') {
      setFilteredPediatriciansData(pediatriciansData);
    } else {
      const filteredData = pediatriciansData.filter(pediatrician => pediatrician.city === cityValue);
      setFilteredPediatriciansData(filteredData);
    }
  }, [cityValue, pediatriciansData]);

  const renderUserAvatar = (row: TableBodyRowType) => {
    if (row.avatarSrc) {
      return <img src={row.avatarSrc} alt="Avatar" style={{ width: 30, height: 30, marginRight: 3 }} />
    } else {
      return (
        <div style={{ width: 30, height: 30, marginRight: 3, backgroundColor: '#e0e0e0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '.8rem' }}>{row.name ? row.name[0] : 'JD'}</span>
        </div>
      )
    }
  }


 
  const getColorFromScore = (score: number,label:string) => {
    // Fonction pour déterminer la couleur en fonction du score
    // Rouge pour les sentiments négatifs, Vert pour les sentiments positifs
    const redNeg = Math.round(score* 255);//Rapproche du rouget lorsque le score est élevé
    const greenNeg = Math.round((1 - score)  * 255);// Rapproche du vert lorsque le score est bas
    const redPos = Math.round((1 - score) * 255); // Rapproche du rouge lorsque le score est bas
    const greenPos = Math.round(score * 255); // Rapproche du vert lorsque le score est élevé
    if (label=='POSITIVE'){
      return `rgb(${redPos}, ${greenPos}, 0)`
    }
    if (label=='NEGATIVE'){
      return `rgb(${redNeg}, ${greenNeg}, 0)`
  
    }
    ;
  };

  // const renderSentimentCircle = (label: string, score: number) => {
  //   const circleSize = 20;
  //   const color = getColorFromScore(score, label);
  //   return (
  //     <div style={{ width: circleSize, height: circleSize, borderRadius: '50%', backgroundColor: color, marginRight: 3 }} />
  //   );
  // };
  

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      field: 'name',
      minWidth: 300,
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderUserAvatar(row)}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ marginBottom: -5, fontWeight: 600, fontSize: '0.875rem' }}>{row.name}</span>
            </div>
          </div>
        )
      }
    },
    
    {
      flex: 0.2,
      minWidth: 300,
      field: 'address',
      headerName: 'Address',
      renderCell: ({ row }: CellType) => (
        <span style={{ fontSize: '0.875rem' }}>{row.address}</span>
      )
    },
    {
      flex: 0.2,
      minWidth: 300,
      field: 'phone_number',
      headerName: 'Phone',
      renderCell: ({ row }: CellType) => (
        <span style={{ fontSize: '0.875rem' }}>{row.phone_number}</span>
      )
    },
    {
      flex: 0.2,
      minWidth: 300,
      field: 'Avis',
      headerName: 'Avis',
      renderCell: ({ row }: CellType) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: getColorFromScore(row.sentiments[0].score, row.sentiments[0].label) }}>
            {row.sentiments[0].label}
          </span>
        </div>
      ),
    },
  ];
  const getRowId = (row: TableBodyRowType) => row._id;

  return (
    // <div>
    //   {/* Cercle avec la couleur pour les sentiments positifs */}
    //   <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
    //     <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: getColorFromScore(1, 'POSITIVE'), marginRight: '8px' }} />
    //     <span>Positif Avis</span>
    //   </div>

    //   {/* Cercle avec la couleur pour les sentiments négatifs */}
    //   <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
    //     <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: getColorFromScore(1, 'NEGATIVE'), marginRight: '8px' }} />
    //     <span>Negatif Avis</span>
    //   </div>

    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filteredPediatriciansData}
        columns={columns}
        autoPageSize
        disableSelectionOnClick
        getRowId={getRowId}
        onRowClick={handleRowClick} // onRowClick event handler
      />
        
    </div>
    // </div>
  )
}

export default TableOfPediatricians
