import './App.css';
import Comp1 from './Components/Component1'
import Comp2 from './Components/Component2'
import Card from './Components/Card'

const card1 = {
  title : 'Avatar 1',
  text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc.',
  img : 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-10.jpg',
  imgAlt: 'alt alt alt'
}

const card2 = {
  title : 'Avatar 2',
  text : 'Luctus venenatis lectus magna fringilla urna. Gravida neque convallis a cras semper auctor neque vitae tempus. Dis parturient montes nascetur ridiculus mus mauris vitae',
  img : 'https://image.flaticon.com/icons/png/512/194/194938.png',
  imgAlt: 'alt alt alt'
}

const card3 = {
  title : 'Avatar 3',
  text : 'In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Accumsan tortor posuere ac ut consequat semper viverra nam.',
  img : 'https://www.shareicon.net/data/512x512/2016/09/15/829446_user_512x512.png',
  imgAlt: 'alt 3'
}

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Card title={card1.title} text={card1.text} img={card1.img} alt={card1.imgAlt} />
        <Card title={card2.title} text={card2.text} img={card2.img} alt={card2.imgAlt} />
        <Card title={card3.title} text={card3.text} img={card3.img} alt={card3.imgAlt} />
        <Card title={card1.title} text={card1.text} img={card1.img} alt={card1.imgAlt} />
      </div>
        
    </div>
  );
}

export default App;
