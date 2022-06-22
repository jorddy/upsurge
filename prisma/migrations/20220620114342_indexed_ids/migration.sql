-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Entry_exerciseId_idx" ON "Entry"("exerciseId");

-- CreateIndex
CREATE INDEX "Exercise_userId_workoutId_idx" ON "Exercise"("userId", "workoutId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Set_entryId_idx" ON "Set"("entryId");

-- CreateIndex
CREATE INDEX "Workout_userId_idx" ON "Workout"("userId");
