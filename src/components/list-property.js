import React from 'react';
import axios from 'axios';

class PropertyList extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            propertyData : null,
            headings : ["address" , "bedroom" , "bathroom" , "description" , "Action"]

		}
    }
    componentDidMount = () => {
        this.fetchPropertyList();
    }

    fetchPropertyList = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/fetchpropertylist',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
            }
        })
        .then((res) => {
            if(res.status == 200){
                const propertyData = (res.data && res.data.data);
                this.setState({
                    propertyData : propertyData
                })
            }
        }).
        catch((error)=>{
        });
    }

     renderHeadingRow = (cell, cellIndex) => {
        return (
            <>
                <Cell
                    key={cellIndex}
                    content={cell}
                    header={true}
                />
          </>
        )
      };
      
      deleteRecord = (propertyId) => {
        axios({
            method: 'POST',
            data: {propertyId : propertyId} ,
            url: 'http://localhost:3000/deleteproperty',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
            }
        })
        .then((res) => {
            if(res.status == 200){
                this.setState({propertyData : this.fetchPropertyList()})
            }
        }).
        catch((error)=>{
            console.log(error,"error---------------");
        }); 
      }
      
      renderRow = (row, rowIndex) => {
        const propertyId = row._id
        let cellIndexTemp = null;
        return (
          <tr key={rowIndex}>
            {Object.values(row).slice(1,5).map((cell, cellIndex) => {
                cellIndexTemp = cellIndex;
              return (
                <Cell
                  key={`${rowIndex}-${cellIndex}`}
                  content={cell}
                />
              )
            })}
            <Cell
                  key={`${rowIndex+1}-${cellIndexTemp + 1}`}
                  content={<button onClick={(e) => this.deleteRecord(propertyId)}>Delete Record</button>}
            />
          </tr>
        )
      };

    theadMarkup = () => {
        return <tr key="heading">
          {this.state.headings.map(this.renderHeadingRow)}
        </tr>
    };
  
    tbodyMarkup = () => {
        return this.state.propertyData.map(this.renderRow)
    };

    renderPropertyList = () => {
        return (
            <>
            {
                this.state.propertyData ? 
                <table className="Table">
                    <thead>{this.theadMarkup()}</thead>
                    <tbody>{this.tbodyMarkup()}</tbody>
                </table>
                : ""
            } 
            </> 
        )
    }
     
    render() {
        return (
              this.renderPropertyList()
        )
    }
}

const Cell = ({
    content,
    header,
}) => {
    const cellMarkup = header ? (
      <th className="Cell Cell-header">
        {content}
      </th>
    ) : (
      <td className="Cell">
        {content}
      </td>
    );
  
    return (cellMarkup);
  }

export default PropertyList