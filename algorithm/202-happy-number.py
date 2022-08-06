# What I learned
# - How to separate number efficiently
# - Use 'set' so this doesn't loop forever

def pdi_function(number: int, base: int = 10):
    total = 0
    while (number > 0):
        last_digit = number % base
        total += pow(last_digit, 2) # Power the last digit and plus with the previous total
        number = number // base # Continue with a new number (by removing the last digit of old number)
        # Then just loop until the new number = 0, we have succesfully calculate the total 
    return total

class Solution:    
    def isHappy(self, number: int) -> bool:
        seen_numbers = set()
        while number > 1 and number not in seen_numbers:
            seen_numbers.add(number)
            number = pdi_function(number)
        return number == 1
                
