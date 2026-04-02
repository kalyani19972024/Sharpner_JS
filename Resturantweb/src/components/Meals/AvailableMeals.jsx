import Card from '../UI/Card.jsx' ;
import Mealitem from './Mealitem';

const DUMMY_MEALS=[
    {
        id:'m1',
        name:'Sushi',
        description:'Finest fish and veggies',
        price:22.99
    },
    {
        id:'m2',
        name:'Schnitzel',
        description:'A german speciality',
        price:16.5
    },
    {
        id:'m3',
        name:'Barbecue Burger',
        description:'American,raw,meaty',
        price:16.5

    },
    {
        id:'m4',
        name:'Green Bowl',
        description:'Healthy... and Green...',
        price:11.5
    }
]
const AvailableMeals=()=>{
    const availmeals=DUMMY_MEALS.map((meal) =>(
         <Mealitem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
        // <li key={meal.id}>{meal.name}</li>
    ))
  return (
     <div className="container mt-4">
        <Card>
           <ul className="list-unstyled m-0 p-3">{availmeals}</ul>
        </Card>
        
     </div>
  )
}

export default AvailableMeals ;