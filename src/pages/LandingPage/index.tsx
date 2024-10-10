import { Checkbox } from "@/components/ui/checkbox"

export default function LandingPage() {
    return (
        <div>
            <h1>Landing Page</h1>
            <Checkbox id="terms" />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Accept terms and conditions
                </label>
        </div>
    )
}