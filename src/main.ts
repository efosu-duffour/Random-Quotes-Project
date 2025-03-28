
type Slip = {
  slip: {
    id: number;
    advice: string;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const generateAdvice = async (): Promise<any> => {
    const url = `https://api.adviceslip.com/advice`;
    try {
      const response = await fetch(url);
      return response.json();

    } catch (err: any) {
      console.error('Error:', err.name, err.message);
    }
  }

  const diceButton = document.getElementById('dice-button') as HTMLButtonElement;
  const advicePara = document.getElementById('advice') as HTMLParagraphElement;
  const adviceNumSpan = document.getElementById('advice-num') as HTMLSpanElement;
  

  const getData = () => {
    return generateAdvice().then((obj?: Slip) => {
      if (obj) {
        
        adviceNumSpan.innerText = String(obj.slip.id);
        advicePara.innerText = obj.slip.advice;
        diceButton.disabled = false;
      }
    })
  }

  getData(); // Getting the data right after DOM is loaded
  advicePara.setAttribute('open', '');

  diceButton.addEventListener('click', () => {
    diceButton.disabled = true;
    
    // For Animation Purpose
    advicePara.removeAttribute('open');
    advicePara.setAttribute('close', '');
    
    let previousWidth: number;

    advicePara.addEventListener('animationstart', (e) => {
      if (e.animationName == 'closeHeight') {
        previousWidth = advicePara.clientWidth;
        console.log(previousWidth);
      }
    }, {once: true});

    advicePara.addEventListener('animationend', async (e) => {
      
      advicePara.style.width = `${previousWidth}px`;
      if (e.animationName === 'closeHeight') {
        await getData();
        advicePara.style.transition = "width 1s ease-in-out";
        advicePara.style.width = "auto";

        setTimeout(() => {
          advicePara.removeAttribute('close');
          advicePara.setAttribute('open', '');
        }, 1000)
      }
     

    }, {once: true})


  })

})