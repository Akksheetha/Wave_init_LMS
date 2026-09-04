import { Page, Locator, expect } from "@playwright/test";
import { basePage } from "./basePage";

export class TrainerCoursePage extends basePage {

    readonly myTrainingModule: Locator;
    readonly course: Locator;
    readonly participantButton: Locator;
    readonly inviteParticipantButton: Locator;
    readonly participantSearchBar: Locator;
    readonly allParticipants: Locator;
    readonly inviteSelectedParticipantsButton: Locator;
    readonly participantAddedSuccessfully: Locator;
    readonly participantListRefreshed: Locator;
    readonly refreshButton: Locator;

    constructor(page: Page) {
        super(page);

        this.myTrainingModule = page.locator(
            "//span[normalize-space()='My Trainings']"
        );

        this.course = page.locator(
            "//button/span[contains(text(), 'React Fundamental')]"
        );

        this.participantButton = page.locator(
            "//span[normalize-space()='Participants']"
        );

        this.inviteParticipantButton = page.locator(
            "//button[@title='Invite Approved Participants']//span[contains(text(),'Invite Participants')]"
        );

        this.participantSearchBar = page.locator(
            "//input[@placeholder='Search approved participants...']"
        );

        this.allParticipants = page.locator(
            "//div/div[@style='font-size: 14px; font-weight: 600; color: rgb(15, 23, 42);']"
        );

        this.inviteSelectedParticipantsButton = page.locator(
            "//button[.//span[normalize-space()='Invite Selected Participants']]"
        );

        this.participantAddedSuccessfully = page.locator(
            "//div[contains(text(),'Participant added successfully')]"
        );

        this.participantListRefreshed = page.locator(
            "//div[contains(text(),'Participant list refreshed')]"
        );

        this.refreshButton = page.locator(
            "//button[@title='Refresh']"
        );
    }

    async clickMyTrainingModule() {
        await this.click(this.myTrainingModule);
    }

    async clickCourse() {
        await this.click(this.course);
    }

    async clickParticipant() {
        await this.click(this.participantButton);
    }

    async clickInviteParticipant() {
        await this.click(this.inviteParticipantButton);
    }

    async enterParticipantName(participantName: string) {
        await this.Type(
            this.participantSearchBar,
            participantName
        );
    }

    async getAllParticipants() {
        try {
            return await this.GetAllTextContents(
                this.allParticipants
            );
        } catch (error) {
            return [];
        }
    }

    async selectApprovedParticipant() {
        await this.click(
            this.allParticipants.first()
        );
    }

    async clickInviteSelectedParticipants() {
        await this.click(
            this.inviteSelectedParticipantsButton
        );
    }

    async verifyParticipantAddedSuccessfully() {
        await expect(
            this.participantAddedSuccessfully
        ).toBeVisible();
    }

    async verifyInviteSelectedParticipantsDisabled() {
        await expect(
            this.inviteSelectedParticipantsButton
        ).toBeDisabled();
    }

    async clickRefresh() {
        await this.click(this.refreshButton);
    }

    async verifyParticipantListRefreshed() {
        await expect(
            this.participantListRefreshed
        ).toContainText(
            "Participant list refreshed"
        );
    }
}