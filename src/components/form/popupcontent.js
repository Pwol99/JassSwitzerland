// PopupContent.js
const PopupContent = ({ feature, navigate }) => {
    const kanType = feature.properties.Jasskarten_typ;
    const language = kanType === 'ger'? 'Deutsch' : 'Französisch';
  
    const handleButtonClick = () => {
      navigate("/main", { state: { jasskartentyp: kanType } });
    };
  
    return (
      <div>
        <b>Kanton:</b> {feature.properties.NAME}<br/>
        <b>Jasskarten Typ:</b> {language}<br/>
        <button className="btn btn-primary" onClick={handleButtonClick}>Go to Main Page</button>
      </div>
    );
  };