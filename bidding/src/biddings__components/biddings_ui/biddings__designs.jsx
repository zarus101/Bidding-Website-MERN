
//////grid displaying component
export const GridComponent___GridComponent = ({ col, gap, children }) => {
    return <div className={`grid ${col} gap-${gap} relative mobile:grid-cols-1 md:grid-cols-1`}>{children}</div>;
  }
  
  ////card dispalying component
  export const CardComponent___CardComponent=({children})=>{
      return <div className=" shadow-xl"> {children}</div>
  }
  