import React, { Component } from 'react'
 
import { CSVReader } from 'react-papaparse'
 
const buttonRef = React.createRef()
 
export default class CsvReader extends Component {
    
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
 
  handleOnFileLoad = (data) => {
    console.log('redaing ---------------------------')
    console.log(data)
    console.log('---------------------------')
  }
 
  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }
 
  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }
 
  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }
 
  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: "2.5rem",
                marginRight: 0,
                width: '100%',
                paddingLeft: 0,
                paddingRight: 0,
                backgroundColor:"#d33f8d",
                color :"white"
              }}
            >
              Browe file
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: "2.4rem",
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor:"#d33f8d",
                color: "white"
              }}
              onClick={this.handleRemoveFile}
            >
              Remove
            </button>
          </aside>
        )}
      </CSVReader>
    )
  }
}
