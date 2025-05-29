import { Component } from "react";

class ErrorBoundary extends Component{ 
    constructor(){
        super();
        this.state={
            hasError: false 
        }
    }
//can be added to any class-based component, and it makes that class-based component an error boundary.
// this lifecycle method will be triggered whenever one of the child components throws an error
    componentDidCatch(error){
        console.log(error);
        this.setState({ hasError:true})
    }

    render(){
        if(this.state.hasError){
            return <p>Something went wrong!</p>
        }
        return this.props.children;
    }

}

export default ErrorBoundary;