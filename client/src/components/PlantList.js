import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
state = ({
  plants: [],
  search: ''
})
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  
    componentDidMount(){
      axios .get('http://localhost:3333/plants')
      .then((res)=>{
        
        this.setState({plants:res.data.plantsData})
      })
      .catch(err=>console.log(err))
      }
  
      //Search input below
      changeHandler=(e)=>{
        const val=e.target.value;
        this.setState({...this.state,[e.target.name]:e.target.value})
        }

      componentDidUpdate(prevProps,prevState){
  
          if(prevState.search !== this.state.search){
           axios
            .get('http://localhost:3333/plants')
            .then(res=>{
                const search = res.data.plantsData.filter(plant => {
                return plant.name.toLowerCase().includes(this.state.search) 
            })
            
            this.setState({plants: search })
            
            if(search.length === 0) {
              console.log("hi")
              const list = document.querySelector(".plant-list")
              const fail = document.createElement('p');  
              fail.textContent = "sorry we don't have what you are looking for :("
              fail.style.color = "white"
              list.appendChild(fail)
              console.log(list)
            }
          
         })
         .catch(err=>{console.log(err)})
         }
        }
      
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
           <input type="text" name="search" placeholder="search for plant" onChange={this.changeHandler} value={this.state.search}></input>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id} data-testid="plant-card">
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
