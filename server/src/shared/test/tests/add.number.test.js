import add_number from "../functions/add_number.js";

test('addition of numbers a and b', () => {
  // call the function directly
  expect(add_number(3,10)).toBe(13)
  
})

test('addition of numbers a and b not equal 13', () => {
  // call the function directly
  expect(add_number(9,10)).not.toBe(29)
                          // toBenull
                          //toBeFalsy
  
})
