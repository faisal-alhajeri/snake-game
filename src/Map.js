


function Map(props) {
    const formatGridToMap = (grid) => {
        return grid.map(row => {
            return <div className="row">{
                        row.map(boxNum => {
                            return boxNum === 0? <div className="box blank"></div>:
                                    boxNum === 1? <div className="box snake"></div>:
                                                <div className="box food"></div>;    
                        })}
                    </div>
        })
    }

    return (
    <div id="map" >
        <div id="playground">
            {formatGridToMap(props.grid)}
        </div>
    </div>
    );
}

export default Map;
