#include <stdio.h>
#include <stdlib.h>

unsigned int define_array(int width, int height)
{
    unsigned int *life_array[] = malloc(sizeof(unsigned int) * width * height);
    return life_array;
};

/*
Finding adjacents using a 1d array:
0  1  2  3  4
5  6  7  8  9
10 11 12 13 14
15 16 17 18 19
20 21 22 23 24

In the case of 13, the index 5 (width) characters before it is directly above it. The index  at -w-1 (7) is up-left of it,
and -w+1 (9) is up-right. For those below it, 13 +w(5) = 18, below, 
*/

//Edge case: if considering 14, how do we calculate what's to the right of it?
//If we're wrapping around, then 10 would be to the right of 14, if we aren't, the space to the right of 14 is dead
//At any rate, we need to do a modulo operation to determine how to proceed. Along the right edge, (index % width = width - 1)
//Along the left edge, (index % width = 0). This is a simple check to see if we're at an edge that can be run on each cell.

//If we're considering 2, how does the program determine that it's on the top of the array? index % height won't work
//Consider what's true for the top and bottom exclusively:
//0, 1 is always going to be equal to the array's width. This means that the first X cells < width. if *life_array[index] < width,
//it's on the top row. The cells on the bottom row will be a minimum of width * (height - 1), and a maximum of 1-(width*height)
//if index >= width * (height - 1), it's on the bottom row.

//Corner case: if both of the above conditions are true, the index must be in a corner.

void init_array(unsigned int *array) {
    for (int i = 0; i < sizeof(array); i++) {
        array[i] = 0;
    }
}

unsigned int total_adjacents(int index, int width, int height, unsigned int *array) {
    int total = 0;
    //Commented numbers use a numpad notation to refer to directionals. 1 = lower left, 6 = right, 8 = up, etc. 5 = self, is unused
    //Check if index is on top left
    if (index % width == 0 && index < width) {
        total += array[index + (width * 2 - 1)]; //1
        total += array[index + width]; //2
        total += array[index + width + 1]; //3
        total += array[index + width - 1]; //4
        total += array[index + 1]; //6
        total += array[(height * width) -1]; //7
        total += array[(width * (height - 1))]; //8
        total += array[(width * (height - 1)) + 1]; //9
    }
    //Check if index is on top right
    else if (index % width == (width - 1) && index < width) {
        total += array[index + width - 1]; //1
        total += array[index + width]; //2
        total += array[index + 1]; //3
        total += array[index - 1]; //4
        total += array[0]; //6
        total += array[width * height - 2]; //7
        total += array[width * height - 1]; //8
        total += array[width * (height - 1)]; //9
    }
    //Check if index is on bottom left
    else if (index % width == 0 && index >= width * (height - 1)) {
        total += array[width - 1]; //1
        total += array[0]; //2
        total += array[1]; //3
        total += array[index + width -1]; //4
        total += array[index + 1]; //6
        total += array[index - 1]; //7
        total += array[index - width]; //8
        total += array[index] - (width - 1); //9
    }
    //Check if index is on bottom right
    else if (index % width == (width - 1) && index >= width * (height - 1)) {
        total += array[width - 2]; //1
        total += array[width - 1]; //2
        total += array[0]; //3
        total += array[index - 1]; //4
        total += array[index - (width - 1)]; //6
        total += array[index - width - 1]; //7
        total += array[index - width]; //8
        total += array[index - (width * 2 - 1)]; //9
    }
    //Check if index is left edge
    else if (index % width == 0) {
        total += array[index + (width * 2 - 1)]; // 1
        total += array[index + width]; // 2
        total += array[index + (width + 1)]; // 3
        total += array[index + (width - 1)]; // 4
        total += array[index + 1]; // 6
        total += array[index - 1]; // 7
        total += array[index - width]; // 8
        total += array[index - (width - 1)]; // 9
    }
    //Check if index is on right edge
    else if (index % width == (width - 1)) {
        total += array[index + (width - 1)]; //1
        total += array[index + width]; //2
        total += array[index + 1]; //3
        total += array[index - 1]; //4
        total += array[index - (width - 1)]; //6
        total += array[index - (width + 1)]; //7
        total += array[index - width]; //8
        total += array[index - (width * 2 - 1)]; //9
    }
    //Check if index is on top
    else if (index < width) {
        total += array[index + (width - 1)]; //1
        total += array[index + width]; //2
        total += array[index + (width + 1)]; //3
        total += array[index - 1]; //4
        total += array[index + 1]; //6
        total += array[index + (width * (height - 1) - 1)]; //7
        total += array[index + (width * (height - 1))]; //8
        total += array[index + (width * (height - 1) + 1)]; //9
    }
    //Check if index is on bottom
    else if (index >= width * (height - 1)) {
        total += array[index - (width * (height - 1) - 1)]; //1
        total += array[index - (width * (height - 1))]; //2
        total += array[index - (width * (height - 1) + 1)]; //3
        total += array[index - 1]; //4
        total += array[index + 1]; //6
        total += array[index - (width + 1)]; //7
        total += array[index - width]; //8
        total += array[index - (width - 1)]; //9
    }
    //If index is on neither edge
    else {
        total += array[index + (width - 1)]; //1
        total += array[index + width]; //2
        total += array[index + (width + 1)]; //3
        total += array[index - 1]; //4
        total += array[index + 1]; //6
        total += array[index - (width + 1)]; //7
        total += array[index - width]; //8
        total += array[index - (width - 1)]; //9
    }
    return total;
}

void life_rules(unsigned int *array, unsigned int *array_b, int index, int total) {
    if (array[index] = 0) {
        if (total == 3) {
            array_b[index] = 1;
        }
    }
    else {
        if (total == 2 || total == 3) {
            array_b[index] = 1;
        }
        else {
            array_b[index] = 0;
        }
    }
}
int main(void) {
    unsigned int life_array_a = define_array(15, 15);
    unsigned int life_array_b = define_array(15, 15);
    init_array(life_array_a);
    init_array(life_array_b);


}
