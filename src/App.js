import { useState } from "react";
import { useSpring, animated } from 'react-spring';

function App() {

  const [elapsed, setElapsed] = useState({
    days: undefined,
    months:undefined,
    years: undefined,
  });
  const [validationError, setValidationError] = useState('');

  const { days, months, years } = elapsed ?? { days: '- -', months: '- -', years: '- -' };
  const daysProps = useSpring({ number: days || 0, from: { number: 0 } });
  const monthsProps = useSpring({ number: months || 0, from: { number: 0 } });
  const yearsProps = useSpring({ number: years || 0, from: { number: 0 } });


  return (

   <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-200">
    <div style={{borderBottomRightRadius:100}} className="w-96 bg-white rounded-xl p-8 border border-gray-2 ">
       <form 
        onSubmit={(e) => {e.preventDefault();
          const formData = new FormData(e.target);
          
          
          const day = formData.get('day');
          const month = formData.get('month');
          const year = formData.get('year');
          const errors = {};

          const currentDate = new Date();
          const enteredDate = new Date(`${year}-${month}-${day}`);

          if (isNaN(enteredDate.getTime())) {
            errors.date = 'Please enter a valid date.';
          } 
          else if (enteredDate > currentDate) {
            errors.date = 'must be in the past';
          }
          else{
            const maxDayInMonth = new Date(year, month, 0).getDate();
            
            if (!day || day< 1 || day>maxDayInMonth) {
              errors.day = 'Must be a valid day.';
            }
        
            if (!month || month < 1 || month > 12) {
              errors.month = 'Must be a valid month.';
            }
        
            if (!year) {
              errors.year = 'Please enter a year.';
            }
          }

          
      
          if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
          }
          
          
          const timeDiff = currentDate - enteredDate;
          
          const millisecondsInDay = 1000 * 60 * 60 * 24;
          const millisecondsInMonth = millisecondsInDay * 30; 
          const millisecondsInYear = millisecondsInDay * 365; 
          
          const daysElapsed = Math.floor(timeDiff / millisecondsInDay);
          const monthsElapsed = Math.floor(timeDiff / millisecondsInMonth);
          const yearsElapsed = Math.floor(timeDiff / millisecondsInYear);
          setValidationError('');
          setElapsed({
            days: daysElapsed,
            months: monthsElapsed,
            years: yearsElapsed,
          })
          e.target.reset();
         
        
         }}
         
         
       >

       <div className="flex gap-4">
        <div className="flex flex-col gap-1 " style={{ width: '80px' }}>
          <label className="text-xs" htmlFor="day">DAY</label>
          <input className={`w-full px-2 py-1 border ${validationError.day ? 'border-red-500' : 'border-gray-1'} rounded`} placeholder="DD" id="day" name='day'></input>
          {validationError.day && <div className="text-red-500 text-xs  mt-1">{validationError.day}</div>}

        </div>
        <div className="flex flex-col gap-1 " style={{ width: '80px' }}>
          <label className="text-xs" htmlFor="month">MONTH</label>
          <input className={`w-full px-2 py-1 border ${validationError.month ? 'border-red-500' : 'border-gray-1'} rounded`} placeholder="MM" id="month" name='month'></input>
          {validationError.month && <div className="text-red-500 text-xs  mt-1">{validationError.month}</div>}
        </div>
        <div className="flex flex-col gap-1" style={{ width: '80px' }}>
          <label className="text-xs" htmlFor="year">YEAR</label>
          <input className={`w-full px-2 py-1 border ${validationError.year ? 'border-red-500' : 'border-gray-1'} rounded`} placeholder="YYYY" id="year" name="year"></input>
          {validationError.year && <div className="text-red-500 text-xs  mt-1">{validationError.year}</div>}
          {validationError.date && <div className="text-red-500 text-xs mt-1">{validationError.date}</div>}
        </div>
        </div>
        <div className="relative">
         <hr className="my-8 border-b-gray-400"></hr>
         <button className=" absolute -top-6 right-0 bg-[#854dff] hover:bg-[#6524f2] rounded-full w-12 h-12 flex items-center justify-center rounded-ful">
         <img className="w-6 h-6" src="/icon-arrow.svg" alt="button"></img>
         </button>
       </div>
       
       </form>
       
       <div className="flex flex-col gap-3  mt-5">
        <div className="flex gap-2 items-center" >
         <animated.span className="text-[#854dff] text-4xl font-blod" >{yearsProps.number.to(value => value.toFixed(0))}</animated.span>
         <span className="text-6xl ">years</span>
        </div>
        <div className="flex gap-2 items-center">
         <animated.span className="text-[#854dff] text-4xl font-blod">{monthsProps.number.to(value => value.toFixed(0))}</animated.span>
         <span className="text-6xl ">months</span>
        </div>
        <div className="flex gap-2 items-center">
         <animated.span className="text-[#854dff] text-4xl font-blod">{daysProps.number.to(value => value.toFixed(0))}</animated.span>
         <span className="text-6xl ">days</span>
        </div>
        

       </div>

     
    </div>
   </main>
  )
}

export default App;
