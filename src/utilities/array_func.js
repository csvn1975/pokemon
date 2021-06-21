const  array_shuff = function (array, repeat = 1) 
{
    /* mixer position array */
    do {
        array.sort(function() { return 0.5 - Math.random() })
        repeat--;
    } while (repeat > 0)

    return Array.from(array);
}

const array_random = (array, count) => {
    let len = array.length;
    return Array.from( {length: count}, () => array[Math.floor(Math.random()*len)] )
}

const  array_range = (start, end, length = end - start + 1 ) => Array.from({ length }, (_, i) => start + i)
 

export { 
    array_shuff, 
    array_range, 
    array_random };

