import {
    Locator,
    Page,
    expect
} from "@playwright/test";
import { basePage } from './basePage';


export class AddTrainingPage extends basePage {

    // =====================================
    // NAVIGATION
    // =====================================

    readonly trainingPrograms: Locator;
    readonly addTrainingBtn: Locator;

    // =====================================
    // CREATE TRAINING
    // =====================================

    readonly trainingTitle: Locator;
    readonly description: Locator;
    readonly trainerInput: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly capacity: Locator;
    readonly createTrainingBtn: Locator;
    readonly backToTrainingsBtn: Locator;

    // =====================================
    // VIEW TRAINING
    // =====================================

    readonly closeBtn: Locator;

    // =====================================
    // EDIT TRAINING
    // =====================================

    readonly saveChangesBtn: Locator;

    readonly editTitleInput: Locator;
    readonly editDescriptionInput: Locator;
    readonly editTrainerInput: Locator;
    readonly editStartDateInput: Locator;
    readonly editEndDateInput: Locator;
    readonly editCapacityInput: Locator;

    // =====================================
    // DELETE TRAINING
    // =====================================

    readonly confirmDeleteBtn: Locator;

    // =====================================
    // SEARCH
    // =====================================

    readonly searchTrainingInput: Locator;


    constructor(page: Page) {

        super(page);


        // =====================================
        // TRAINING PROGRAMS
        // =====================================

        this.trainingPrograms = page.getByText(
            "Training Programs",
            {
                exact: true
            }
        );


        // =====================================
        // CREATE TRAINING
        // =====================================

        this.addTrainingBtn = page.getByRole(
            "button",
            {
                name: "Add Training",
                exact: true
            }
        );


        this.trainingTitle = page.getByPlaceholder(
            "e.g. React Fundamentals"
        );


        this.description = page.getByPlaceholder(
            "Training objectives and content overview..."
        );


        this.trainerInput = page.getByPlaceholder(
            "Search trainers by name or email..."
        );


        this.startDate = page.locator(
            "input[type='datetime-local']"
        ).nth(0);


        this.endDate = page.locator(
            "input[type='datetime-local']"
        ).nth(1);


        this.capacity = page.locator(
            "input[type='number'][placeholder='e.g. 30']"
        );


        this.createTrainingBtn = page.getByRole(
            "button",
            {
                name: "Create Training Session",
                exact: true
            }
        );


        this.backToTrainingsBtn = page.getByRole(
            "button",
            {
                name: "Back to Trainings",
                exact: true
            }
        );


        // =====================================
        // VIEW
        // =====================================

        this.closeBtn = page.getByRole(
            "button",
            {
                name: "Close",
                exact: true
            }
        );


        // =====================================
        // EDIT
        // =====================================

        this.saveChangesBtn = page.getByRole(
            "button",
            {
                name: "Save Changes",
                exact: true
            }
        );


        this.editTitleInput = page.locator(
            "input[type='text']"
        ).first();


        this.editDescriptionInput = page.locator(
            "textarea"
        ).first();


        this.editTrainerInput = page.getByPlaceholder(
            "Search trainers by name or email..."
        );


        this.editStartDateInput = page.locator(
            "input[type='datetime-local']"
        ).nth(0);


        this.editEndDateInput = page.locator(
            "input[type='datetime-local']"
        ).nth(1);


        this.editCapacityInput = page.locator(
            "input[type='number']"
        ).first();


        // =====================================
        // DELETE
        // =====================================

        this.confirmDeleteBtn = page.getByRole(
            "button",
            {
                name: "Confirm",
                exact: true
            }
        );


        // =====================================
        // SEARCH
        // =====================================

        this.searchTrainingInput = page.getByPlaceholder(
            "Search by title or trainer..."
        );
    }


    // =====================================
    // NAVIGATION
    // =====================================

    async clickTrainingPrograms(): Promise<void> {

        await this.trainingPrograms.click();
    }


    // =====================================
    // CREATE TRAINING
    // =====================================

    async clickAddTraining(): Promise<void> {

        await this.addTrainingBtn.click();
    }


    async enterTrainingTitle(
        title: string
    ): Promise<void> {

        await this.trainingTitle.fill(title);
    }


    async enterDescription(
        description: string
    ): Promise<void> {

        await this.description.fill(description);
    }


    async selectTrainer(
        trainer: string
    ): Promise<void> {

        await this.trainerInput.fill(trainer);

        await this.page
            .getByText(
                trainer,
                {
                    exact: true
                }
            )
            .click();
    }


    async enterStartDate(
        dateTime: string
    ): Promise<void> {

        await this.startDate.fill(dateTime);
    }


    async enterEndDate(
        dateTime: string
    ): Promise<void> {

        await this.endDate.fill(dateTime);
    }


    async enterCapacity(
        capacity: string
    ): Promise<void> {

        await this.capacity.fill(capacity);
    }


    async clickCreateTraining(): Promise<void> {

        await this.createTrainingBtn.click();
    }


    async clickBackToTrainings(): Promise<void> {

        await this.backToTrainingsBtn.click();
    }


    async verifyTrainingCreated(
        trainingTitle: string
    ): Promise<void> {

        await expect(
            this.page.getByText(
                trainingTitle,
                {
                    exact: false
                }
            ).first()
        ).toBeVisible({
            timeout: 10000
        });
    }


    // =====================================
    // SEARCH
    // =====================================

    async searchTraining(
        searchValue: string
    ): Promise<void> {

        await this.searchTrainingInput.fill(
            searchValue
        );

        await this.page.waitForTimeout(500);
    }


    async verifySearchResult(
        searchValue: string
    ): Promise<void> {

        const matchingRow =
            this.page
                .locator("tbody tr")
                .filter({
                    hasText: searchValue
                })
                .first();

        await expect(
            matchingRow
        ).toBeVisible({
            timeout: 10000
        });
    }


    // =====================================
    // VIEW TRAINING
    // =====================================

    async clickViewTraining(
        trainingTitle: string
    ): Promise<void> {

        const trainingRow =
            this.page
                .locator("tbody tr")
                .filter({
                    hasText: trainingTitle
                })
                .first();

        await expect(
            trainingRow
        ).toBeVisible({
            timeout: 10000
        });

        await trainingRow
            .locator(
                "button:has(svg.lucide-eye)"
            )
            .click();
    }


    async verifyTrainingDetails(): Promise<void> {

        await expect(
            this.page.getByText(
                "Training Details",
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 10000
        });
    }


    async clickClose(): Promise<void> {

        await this.closeBtn.click();
    }


    async verifyTrainingDetailsClosed(): Promise<void> {

        await expect(
            this.page.getByText(
                "Training Details",
                {
                    exact: true
                }
            )
        ).toBeHidden({
            timeout: 10000
        });
    }


    // =====================================
    // EDIT TRAINING
    // =====================================

    async clickEditTraining(
        trainingTitle: string
    ): Promise<void> {

        const trainingRow =
            this.page
                .locator("tbody tr")
                .filter({
                    hasText: trainingTitle
                })
                .first();

        await expect(
            trainingRow
        ).toBeVisible({
            timeout: 10000
        });

        await trainingRow
            .getByTitle("Edit Training")
            .click();

        await expect(
            this.saveChangesBtn
        ).toBeVisible({
            timeout: 10000
        });
    }


    async editTrainingTitle(
        title: string
    ): Promise<void> {

        await this.editTitleInput.fill(
            title
        );
    }


    async editDescription(
        description: string
    ): Promise<void> {

        await this.editDescriptionInput.fill(
            description
        );
    }


    async editStartDate(
        dateTime: string
    ): Promise<void> {

        await this.editStartDateInput.fill(
            dateTime
        );
    }


    async editEndDate(
        dateTime: string
    ): Promise<void> {

        await this.editEndDateInput.fill(
            dateTime
        );
    }


    async editCapacity(
        capacity: string
    ): Promise<void> {

        await this.editCapacityInput.fill(
            capacity
        );
    }


    async clickSaveChanges(): Promise<void> {

        await this.saveChangesBtn.click();

        await this.trainingPrograms.waitFor({
            state: "visible",
            timeout: 10000
        });
    }


    async verifyTrainingUpdated(
        trainingTitle: string
    ): Promise<void> {

        await expect(
            this.page.getByText(
                trainingTitle,
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 10000
        });
    }


    // =====================================
    // DELETE TRAINING
    // =====================================

    async clickDeleteTraining(
        trainingTitle: string
    ): Promise<void> {

        const trainingRow =
            this.page
                .locator("tbody tr")
                .filter({
                    hasText: trainingTitle
                })
                .first();

        await expect(
            trainingRow
        ).toBeVisible({
            timeout: 10000
        });

        await trainingRow
            .getByTitle("Delete Training")
            .click();
    }


    async verifyDeleteConfirmation(): Promise<void> {

        await expect(
            this.confirmDeleteBtn
        ).toBeVisible({
            timeout: 10000
        });
    }


    async confirmDeleteTraining(): Promise<void> {

        await this.confirmDeleteBtn.click();
    }


    async verifyTrainingDeleted(
        trainingTitle: string
    ): Promise<void> {

        await expect(
            this.page
                .getByText(
                    trainingTitle,
                    {
                        exact: true
                    }
                )
        ).toBeHidden({
            timeout: 10000
        });
    }
}


export default AddTrainingPage;