import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import React from 'react'
import LandingPage from './Scripts/LandingPage.js'
import RegisterScreen from './Scripts/Register'

//Render Action Testing
it('rendering without crashing', () => {});

//Snapshot testing
afterEach(cleanup)

it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment(<App />)).toMatchSnapshot()
   });
//Button Click Testing
it("captures clicks", done => {
    function handleClick() {
      done();
    }
    const { getByText } = render(
      <button onClick={handleClick}>Click Me</button>
    );
    const node = getByText("Click Me");
    fireEvent.click(node);
  });
  
  afterEach(cleanup);

  //Input Chnage Event Testing

  it("captures changes", done => {
    function handleChange(evt) {
      expect(evt.target.value).toEqual("whamo");
      done();
    }
    const { getByPlaceholderText } = render(
      <input onChange={handleChange} placeholder="Change Me" />
    );
    const node = getByPlaceholderText("Change Me");
    fireEvent.change(node, { target: { value: "whamo" } });
  });
   

