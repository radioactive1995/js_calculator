import './Button.css'

export default function Button({id, element, dispatch}) {
    
    const onClickHandler = () => {
        const operatorIds = ['add','subtract','multiply','divide'];
        const elementIds = ['nine', 'eight', 'seven', 'six', 'five', 'four', 'three',
                            'two','one','zero']


        if(elementIds.indexOf(id) !== -1) {
            dispatch({type: 'input', value: element})
        }
        else if(operatorIds.indexOf(id) !== -1) {
            console.log('fant operator element')
            dispatch({type: 'operatorString', value: element})
        }

        else if(id === 'equals') {
            dispatch({type: 'equals'})
        }

        else if (id === 'clear') {
            dispatch({type: 'clear'})
        }

        else if (id == 'decimal') {
            console.log('decimal heere dispatch!')
            dispatch({type: 'decimal', value: element})
        }
    }
    return (<div id={id} className="button" onClick={onClickHandler}>{element}</div>)
}