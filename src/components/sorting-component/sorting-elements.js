import styled from 'styled-components'

export const LeftContent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin-bottom: 40px;
  align-items: start;
  justify-content: start;
  text-align: start;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    width: 4px;
    height: 28px !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
  }
  -webkit-scrollbar-track {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 15);
  }
`
export const RadioContent = styled.div`
  padding: 5px;
  flex-wrap: wrap;
`
