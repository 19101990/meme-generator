import './Form.css';
import { useState } from "react";
import html2canvas from 'html2canvas';
import colors from '../colors'



export default function Form() {

  // Init meme object
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    color: "#fff",
    fontSize: 35,
    fontFamily: "Arial"
  })

  // Upload image
  const [image, setImage] = useState("https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg");
  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  // Get text
  function handleTextChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({ ...prevMeme, [name]: value }))
  }

  // Download meme using html2canvas
  const downloadMeme = async (extension) => {
    const meme = document.getElementById('meme_wrapper'),
    canvas = await html2canvas(meme),
    data = canvas.toDataURL(`image/${extension}`),
    link = document.createElement('a');
    link.href = data;
    link.download = `meme.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  // Handle style changes
  function increseSize() {
    setMeme(prevMeme => ({ ...prevMeme, fontSize: prevMeme.fontSize + 5 }))
  }

  function decreseSize() {
    setMeme(prevMeme => ({ ...prevMeme, fontSize: prevMeme.fontSize - 5 }))
  }

  function updateColor(color) {
    setMeme(prevMeme => ({ ...prevMeme, color: color }))
  }

  function changeFont(font) {
    setMeme(prevMeme => ({ ...prevMeme, fontFamily: font }))
  }

  // Create color elements
  const colorElements = colors.map(color => (
    <div className="color" style={{ backgroundColor: color.hex }} key={color.hex} onClick={() => updateColor(color.hex)}></div>
  ))

  // Create font buttons
  const fonts = ["Arial", "Comic Sans", "Pacifico"]
  const fontElements = fonts.map(font => (
    <button type="button" key={font} onClick={() => changeFont(font)}>{font}</button>
  ))

  // Create download buttons
  const extensions = ['jpg', 'png', 'gif']
  const extensionElements = extensions.map(extension => (
    <button type="button" key={extension} onClick={() => downloadMeme(extension)}>{extension}</button>
  ))


  return (
    <div className="meme_generator">
      <div id="meme_wrapper">
        <h2 style={{color: meme.color, fontSize: `${meme.fontSize}px`, fontFamily: meme.fontFamily}}>{meme.topText}</h2>
        <img src={image} alt="" />
        <h2 style={{color: meme.color, fontSize: `${meme.fontSize}px`, fontFamily: meme.fontFamily}}>{meme.bottomText}</h2>
      </div>

      <div className="meme_customization">
        <div className="form_wrapper">
          <h3>Add your text and image</h3>
          <input type="text" placeholder={meme.topText} className="--top" name="topText" value={meme.topText} onChange={handleTextChange}/>
          <input type="text" placeholder={meme.bottomText} className="--bottom" name="bottomText" value={meme.bottomText} onChange={handleTextChange}/>
          <label htmlFor="file-upload" className="upload_label">Upload image<input id="file-upload" type="file" onChange={handleChange} /></label>
        </div>

        <div className="styling_wrapper">
          <h3>Add some styling</h3>
          <div className="size">
            <button type="button" onClick={increseSize}>A+</button>
            <button type="button" onClick={decreseSize}>A-</button>
          </div>
          <div className="fonts">{fontElements}</div>
          <div className="colors">{colorElements}</div>
          
        </div>

        <div className="download_wrapper">
          <span>Download meme</span>
          <div>{extensionElements}</div>
        </div>
      </div>
  </div>
  );
}
