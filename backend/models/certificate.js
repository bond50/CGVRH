const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const crypto = require('crypto');

const Sequence = require('./sequence');

async function generateComplexSerial() {
    const sequenceName = 'certificate_serial_number'; // Unique name for the sequence
    let sequence = await Sequence.findOne({name: sequenceName});

    if (!sequence) {
        sequence = new Sequence({name: sequenceName});
        await sequence.save();
    }

    const serialNumber = `VCRH-${sequence.value.toString().padStart(4, '0')}-${Date.now().toString().slice(-4)}`;
    sequence.value++; // Increment the sequence value
    await sequence.save(); // Save the updated sequence value

    return serialNumber;
}

const certificateSchema = new mongoose.Schema(
    {
        serialNumber: {
            type: String,
            unique: true,
        },
        projectTitle: {
            type: String,
            required: true,
        },
        contractor: {
            type: String,
            required: true,
        },
        projectManager: {
            type: String,
            required: true,
        },
        facilityName: {
            type: String,
            required: true,
            default: 'Vihiga County Referral Hospital',
        },
        tenderId: {
            type: String,
            required: true,
        },
        partOfWorks: {
            type: String,
            required: true,
        },
        wholeOfWorks: {
            type: String,
            required: true,
        },
        defectsText: {
            type: String,
            required: true,
        },
        facilityIncharge: {
            type: String,
            required: true,
        },
        projectSupervisor: {
            type: String,
            required: true,
        },
        plannedCompletionDate: {
            type: Date,
            required: true,
        },
        actualCompletionDate: {
            type: Date,
            required: true,
        },
        defectsDate: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        completionPercentage: {
            type: Number,
            required: true,
        },
        valid: {type: Boolean, default: true},

        createdBy: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true}
);

// Pre-save hook to generate serial number
certificateSchema.pre('save', async function (next) {
    const doc = this;

    if (!doc.serialNumber) { // If serial number isn't already set
        doc.serialNumber = await generateComplexSerial(); // Set the complex serial number using the updated function
    }

    next(); // Continue saving
});
module.exports = mongoose.model('Certificate', certificateSchema);
