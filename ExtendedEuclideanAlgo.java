import java.util.Scanner;

public class ExtendedEuclideanAlgo {
    public static void extendedEuclid(int a, int b) {
        // Initial coefficients
        int t0 = 0, t1 = 1;
        int s0 = 1, s1 = 0;

        // Remainders
        int r0 = a, r1 = b;

        System.out.printf("%-10s %-10s %-10s %-10s %-10s %-10s %-10s %-10s\n",
                "Dividend", "Divisor", "Quotient", "Remainder",
                "T0", "T1", "T(new)", "Step");
        System.out.println("---------------------------------------------------------------------------------------");

        int step = 1;
        while (r1 != 0) {
            int q = r0 / r1; // Quotient
            int r = r0 % r1; // Remainder
            int t = t0 - q * t1; // New T coefficient
            int s = s0 - q * s1; // New S coefficient (if needed)

            System.out.printf("%-10d %-10d %-10d %-10d %-10d %-10d %-10d %-10d\n",
                    r0, r1, q, r, t0, t1, t, step);

            // Shift for next step
            r0 = r1;
            r1 = r;
            t0 = t1;
            t1 = t;
            s0 = s1;
            s1 = s;
            step++;
        }

        System.out.println("\nGCD of inputs: " + r0);
        System.out.println("Final coefficient T (useful for modular inverse of b mod a if gcd = 1): " + t0);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number (a): ");
        int a = sc.nextInt();
        System.out.print("Enter second number (b): ");
        int b = sc.nextInt();
        sc.close();

        extendedEuclid(a, b);

        sc.close();
    }
}
