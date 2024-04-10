import './skeleton.css'

function Skeleton({ amount }: {amount:number}) {
    const boxes = Array(amount).fill(0).map((_,i)=>{
        return <div key={i} className="skeleton rounded mb-2">
            <div className='skeleton__inner'></div>
        </div>
    })
    return boxes
}

export default Skeleton;